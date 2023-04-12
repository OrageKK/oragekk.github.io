#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import os
import requests
import xml.etree.ElementTree as ET
# 提取sitemap中的所有URL


def extract_urls_from_sitemap(sitemap_url):
    response = requests.get(sitemap_url)
    sitemap_xml = response.content
    sitemap_root = ET.fromstring(sitemap_xml)
    urls = []
    for child in sitemap_root:
        url = child[0].text
        urls.append(url)
    return urls

# 推送URL列表到百度站长


def push_urls_to_baidu(urls, site_url):
    token = os.environ["BAIDU_KEY"]#因为$前面是大写所以也是大写
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
        print("百度推送成功:",response.content)
    else:
        print("百度Error ", response.content)


def push_urls_to_bing(urls):
    # 调用Bing API提交URL
    bing_api_key = os.environ["BING_KEY"]#因为$前面是大写所以也是大写
    bing_api_url = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=" + bing_api_key

    headers = {"Content-Type": "application/json"}

    data = {
        "siteUrl": "https://oragekk.me",
        "urlList": urls
    }

    response = requests.post(bing_api_url, json=data, headers=headers)
    if response.status_code == 200:
        print("Bing 推送成功!:",response.content)
    else:
        print("Bing Error ", response.content)

# 主程序
if __name__ == '__main__':
    sitemap_url = 'https://oragekk.me/sitemap.xml'
    site_url = 'https://oragekk.me'
    urls = extract_urls_from_sitemap(sitemap_url)
    push_urls_to_bing(urls)
    push_urls_to_baidu(urls, site_url)
