#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import json
import os
import requests
import argparse
import xml.etree.ElementTree as ET
from oauth2client.service_account import ServiceAccountCredentials
import httplib2

# 从命令行参数提取sitemap


def getSiteMap():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--sitemap', help='Path to sitemap file', required=True)
    args = parser.parse_args()
    print(f"sitemap path: {args.prevsitemap}")
    return args.sitemap

# 提取上次提交的sitemap


def getPrevSiteMap():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--prevsitemap', help='Path to prevsitemap file', required=True)
    args = parser.parse_args()
    print(f"prevsitemap path: {args.prevsitemap}")
    return args.prevsitemap

# 从sitemap提取url


def extract_urls_from_sitemap(sitemap_path):
    urls = []
    with open(sitemap_path, 'r') as f:
        tree = ET.parse(f)
        root = tree.getroot()
        for url in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
            # 获取 loc 元素的文本内容
            loc = url.find(
                '{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
            urls.append(loc)
        print(urls)
    return urls

# 获取更新的url


def diff_urls(urls, prev_urls):
    final_urls = list(set(urls) ^ set(prev_urls))
    return final_urls

# 推送URL列表到百度站长


def push_urls_to_baidu(urls, site_url):
    token = os.environ["BAIDU_KEY"]  # 因为$前面是大写所以也是大写
    url = 'http://data.zz.baidu.com/urls?site={}&token={}'.format(
        site_url, token)
    headers = {
        'Content-Type': 'text/plain',
        'User-Agent': 'curl/7.12.1',
        'Host': 'data.zz.baidu.com'
    }
    data = '\n'.join(urls)
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print(f"🎉百度推送成功!:\n{response.content}")
    else:
        print(f"🛎百度Error:\n{response.content} ")

# 调用Bing API提交URL


def push_urls_to_bing(urls, site_url):
    bing_api_key = os.environ["BING_KEY"]  # 因为$前面是大写所以也是大写
    bing_api_url = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=" + bing_api_key

    headers = {"Content-Type": "application/json"}

    data = {
        "siteUrl": site_url,
        "urlList": urls
    }

    response = requests.post(bing_api_url, json=data, headers=headers)
    if response.status_code == 200:
        print(f"🎉Bing推送成功!:\n{response.content}")
    else:
        print(f"🛎Bing Error:\n{response.content} ")

# Google index API


def push_urls_to_google(urls):
    SCOPES = ["https://www.googleapis.com/auth/indexing"]
    ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

    # service_account_file.json is the private key that you created for your service account.
    JSON_KEY_FILE = os.environ["GOOGLE_JSON"]

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        JSON_KEY_FILE, scopes=SCOPES)

    http = credentials.authorize(httplib2.Http())

    content = []
    for url in urls:
        item = {
            "url": url,
            "type": "URL_UPDATED"
        },
        content.append(item)
    body = json.dumps({"urlNotifications": content}).encode("utf-8")
    response, content = http.request(ENDPOINT, method="POST", body=body)
    if response.status_code == 200:
        print(f"🎉Google推送成功!:\n{response.content}")
    else:
        print(f"🛎Google Error:\n{response.content} ")


# 主程序
if __name__ == '__main__':
    site_url = 'https://oragekk.me'
    sitemap_path = getSiteMap()
    prev_sitemap_path = getPrevSiteMap()
    urls = extract_urls_from_sitemap(sitemap_path)
    prev_urls = extract_urls_from_sitemap(prev_sitemap_path)
    final_urls = diff_urls(urls, prev_urls)
    print(f"最终url:{final_urls}")
    push_urls_to_bing(urls, site_url)
    push_urls_to_baidu(urls, site_url)
    push_urls_to_google(urls)
