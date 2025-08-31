import requests

URL = "https://api.ebay.com/buy/browse/v1/item_summary/search?q=macbook&limit=200&filter=buyingOptions:{FIXED_PRICE}&offset=2000"


header = {
    "Authorization":"Bearer v^1.1#i^1#r^0#f^0#I^3#p^1#t^H4sIAAAAAAAA/+VYbWwURRi+u7Zo6QcfomBj4rFAgsLuzd7tfS3cmaPXg4bSq9y1fKXi3u5su/Rud9mZpb1W41FN1WBCTAQxSAIkqEQlxjSgDZq0RCSQqAj4gz+oCU3FRCABFeSHu9ejXAsBpGds4v25zDvvvPM8z7zvzOyAzKTSp3uW9fxRYX3ItjsDMjarlS4DpZNKFlQW2apKLCDPwbo7MzdT3F00tBhxqaTKroRIVWQE7R2ppIzYrDFA6JrMKhySECtzKYhYzLOx0Io61kkBVtUUrPBKkrDXhgOEB7gEIHg5n9PPiwzvM6zyzZhxJUAw0Av8HpBw0X4giF7B6EdIh7UywpyMA4QTON0k8JE0EwcM62JY2kvRfvdawt4ENSQpsuFCASKYhctmx2p5WO8OlUMIatgIQgRrQ5FYNFQbrqmPL3bkxQrmdIhhDutodKtaEaC9iUvq8O7ToKw3G9N5HiJEOILDM4wOyoZugnkA+FmpnaKH93k8HsgnEk6G4QsiZUTRUhy+Ow7TIgmkmHVloYwlnL6XooYaiQ2Qx7lWvRGiNmw3/57VuaQkSlALEDVLQmtCDQ1EMKRJG6tblXYyDhEmG1aGScZHu31OH+0naQE6RQb4cpMMR8pJPGaWakUWJFMwZK9X8BJoIIZjdXHm6WI4ReWoFhKxiSbfz3NTP59nrbmgwyuo41bZXFOYMkSwZ5v3Vn9kNMaalNAxHIkwtiMrT4DgVFUSiLGd2TzMpU4HChCtGKusw9He3k61uyhFa3E4AaAdq1fUxfhWmOKInK9Z6x1IuvcAUspS4aExEkksTqsGlg4jTw0AcgsRdLs8LobJ6T4aVnCs9TZDHmfH6GooVHW4/W6vEwK/yLsBQ3voQlRHMJegDhMHTHBpMsVpbRCrSY6HJG/kmZ6CmiSwLrfodPlESAoev0gyflEkE27BQ9IihADCRIL3+/4vRXK/aR6DvAZxwfK8IDleAzQQrVnjUFvDYS3sCquyV4os71Ajde380o1aY8vS9KaI7tuAVrUH7rcS7ki+OikZysSN+QspgFnr4xdhmYIwFMZFL8YrKmxQkhKfnlgL7NKEBk7D6RhMJg3DuEiGVLW2cPt0Qej9gy3iwTgX9mz6D86lO7JCZrpOLFbmeGQE4FSJMk8eildSDoUzrhymaT3izVo3UI+Lt2TcVicUa4PkMFtJGL5mUlnKFNrEUxpEiq4ZN2wqat684koblI2zDGtKMgm1JnrctZxK6ZhLJOFEK+oCJLjETbCDlva63TTjAW7vuHjx2WN0/UTbkgq9DRd3W6fdxn0l5JKpicVb1RRB58275b/wmeAY/WARtGR/dLd1AHRbv7RZrWAxmEfPAbMnFTUWF5VXIQlDSuJECkktsvEdrkGqDaZVTtJsj1i+rawTNi+ru5pJ6IdWXXnGZ6nIey/Z3QxmjbyYlBbRZXnPJ+CJWz0l9JSZFU438NEMYFwM7V0L5tzqLaYfK57RmxLrup46F9QPMm8ce/n0ozeO//o7qBhxslpLLMbiWhrXze7/rPm5o5l4Z+zcu7GmT68uOtn/+iD55vmewceHpjbMaN66IHpj2syuTyKTd37BfZgha460Hb8+dHF774kf+ss6y068NlC1f/nWQ2f37dhmff/A800eRrU8+XHg4kfbSmZd3TN9y/xLti2xSvz1wrMtA+v7pg6+1btwvq2nqPTCya8+Dw/Gun56sepK2zdS8Yy+bbbAq6c2t7w0fef3e6nyMzfa9r83OMUVudDnn/tO+awd6w6Cw/uilz8o0XpXb99ffrJtecPRA1sO/4auyxzZuXGgse/ygeaha293tp6rhKcmz7u257tde7tfaDx6cdGPp/0PrzjTv+vPha8cifz1y6Xzx5q7fp62OVNZP7yWfwMWlQw2yRIAAA==",
    "X-EBAY-C-MARKETPLACE-ID":"EBAY_US",
    "X-EBAY-C-ENDUSERCTX":"affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>"
}

response = requests.get(URL, headers=header)

print(response)
try:
    items = response.json()['itemSummaries']
except:
    print("issues")

for i in items:
    try:
        print("Title: ", i['title'])
    except:
        pass
    try:    
        print("Price: ", i['price']['value'])
    except:
        pass
    try:
        print("Market Price: ", i['marketingPrice']['originalPrice']['value'])
    except:
        pass
    try:
        print("Condition: ", i['condition'])
    except:
        pass
    try:
        print("Condition ID: ", i['conditionId'])
    except:
        pass
    
