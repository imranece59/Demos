#!/usr/bin/python
import argparse
import os
import datetime
import pandas as pd
import SendMail


from DBConnect import DB


SqlFileDir = "sql/"
DataFile = "data/"
cDB = None
getStockEquitySummary200File = SqlFileDir + "getStockEquitySummary200File.sql"
getStockEquitySummary50File = SqlFileDir + "getStockEquitySummary50File.sql"
getStockEquitySummary30File = SqlFileDir + "getStockEquitySummary30File.sql"

subjdate = '{:%Y-%m-%d}'.format(datetime.datetime.now())

SUBJECT = "Stock Equity Summary Report :- " + str(subjdate)


RECEIVER_IDS = ['imranece59@gmail.com', 'krenga85@gmail.com']

RECEIVER_ID = ", ".join(RECEIVER_IDS)

global getStockEquitySummaryFile
currentDate = '{:%Y-%m-%d}'.format(datetime.datetime.now())

def myMain():
    connect2DB()
    generateStockEquityReport()
    sendattachmentinmail()

def connect2DB():
    global cDB
    param = {'server': 'local'}
    cDB = DB(param)


def getStockEquitySummaryDays(getStockEquitySummaryFile):


    dbCmd = open(getStockEquitySummaryFile).read()
    dbCmd = dbCmd.rstrip()
    dbCmd = dbCmd.replace("CURRENT_DATE", "'" + str(currentDate) + "'")
    resultSet = cDB.runCmd(dbCmd)
    return resultSet


def generateStockEquityReport():

    resultset = getStockEquitySummaryDays(getStockEquitySummary200File)
    resultdf = pd.DataFrame(resultset, columns=['ScCode','StockName', 'Latest CMP', 'AverageClosingPrice', 'Status'])
    writer = pd.ExcelWriter(DataFile + "StockEquitySummary.xlsx")
    resultdf.to_excel(writer, 'StockEquitySummaryOf200Days', index=False)
    workbook = writer.book
    worksheet = writer.sheets['StockEquitySummaryOf200Days']
#    worksheet.set_column('A:A', 15)
#    worksheet.set_column('B:B', 25)
#    worksheet.set_column('C:C', 25)
#    worksheet.set_column('D:D', 25)

    resultset2 = getStockEquitySummaryDays(getStockEquitySummary50File)
    resultdf2 = pd.DataFrame(resultset2, columns=['ScCode', 'StockName', 'Latest CMP', 'AverageClosingPrice', 'Status'])

    resultdf2.to_excel(writer, 'StockEquitySummaryOf50Days', index=False)
    workbook = writer.book
    worksheet = writer.sheets['StockEquitySummaryOf50Days']
#    worksheet.set_column('A:A', 15)
#    worksheet.set_column('B:B', 25)
#    worksheet.set_column('C:C', 25)
#    worksheet.set_column('D:D', 25)

    resultset3 = getStockEquitySummaryDays(getStockEquitySummary30File)
    resultdf3 = pd.DataFrame(resultset3, columns=['ScCode', 'StockName', 'Latest CMP', 'AverageClosingPrice', 'Status'])

    resultdf3.to_excel(writer, 'StockEquitySummaryOf30Days', index=False)
    workbook = writer.book
    worksheet = writer.sheets['StockEquitySummaryOf30Days']
#    worksheet.set_column('A:A', 15)
#    worksheet.set_column('B:B', 25)
#    worksheet.set_column('C:C', 25)
#    worksheet.set_column('D:D', 25)

    writer.save()

def sendattachmentinmail():
    print "Sending Email....."
    body = """\
          <html>Hi All,<br><br>
          Please find attached the Stock Equity Summary Report.<br><br>
          Regards,<br>
          Stock Analytics Team
          </html>
          """
    SendMail.proceedWithAttachments(SUBJECT, RECEIVER_ID, body, DataFile+"/"+ "StockEquitySummary.xlsx", fileType = "xlsx")
    print "Email Sent....."




if __name__ == '__main__':
    myMain()
