#!/usr/bin/python
import argparse
import os
import datetime

from DBConnect import DB


opsSqlFileDir = "sql/"
cDB = None
getCPmovingAverageFile = opsSqlFileDir + "getCPmovingavg.sql"
getLatestClosingPriceFile = opsSqlFileDir + "getLatestClosingPriceByScCode.sql"
UpsertStockEquitySummaryFile = opsSqlFileDir + "UpsertStockEquitySummary.sql"
global getCPmovingAverageFile, getLatestClosingPriceFile, UpsertStockEquitySummaryFile
currentDate = '{:%Y-%m-%d}'.format(datetime.datetime.now())
currentTimeStamp = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())

def myMain():
    StockNames = getStockNames()
    upsertStockEquitySummary(StockNames)

def connect2DB():
    global cDB
    param = {'server': 'local'}
    cDB = DB(param)


def getStockNames():
    getStockNameSqlFile = opsSqlFileDir + "getStockNames.sql"
    connect2DB()
    dbCmd = open(getStockNameSqlFile).read()
    dbCmd = dbCmd.rstrip()
    resultSet = cDB.runCmd(dbCmd)
    return resultSet

def upsertStockEquitySummary(resultset):

    for row in resultset:
        UpsertStockEquitySummary(row[0])
    cDB.commit()

def getCPMovingAvg(ScCode,Days):

    dbCmd = open(getCPmovingAverageFile).read()
    dbCmd = dbCmd.rstrip()
    dbCmd = dbCmd.replace("SC_CODE", str(ScCode))
    dbCmd = dbCmd.replace("LIMIT_RANGE",    str(Days))
    resultSet = cDB.runCmd(dbCmd)

    return resultSet

def getLatestClosingPriceByScCode(ScCode):

    dbCmd = open(getLatestClosingPriceFile).read()
    dbCmd = dbCmd.rstrip()
    dbCmd = dbCmd.replace("SC_CODE", str(ScCode))
    resultSet = cDB.runCmd(dbCmd)

    return resultSet[0][0],resultSet[0][1]

def UpsertStockEquitySummary(ScCode):

    CPMovingAvg200Days = getCPMovingAvg(ScCode, 200)[0][0]
    CPMovingAvg50Days = getCPMovingAvg(ScCode, 50)[0][0]
    CPMovingAvg30Days = getCPMovingAvg(ScCode, 30)[0][0]
    LatestClosingPriceRs = getLatestClosingPriceByScCode(ScCode)
    LatestClosingPrice = LatestClosingPriceRs[0]
    StockName = LatestClosingPriceRs[1]

    if (CPMovingAvg200Days < LatestClosingPrice):
        CPMovingAvg200DaysStatus = 'low'
    elif (CPMovingAvg200Days > LatestClosingPrice):
        CPMovingAvg200DaysStatus = 'high'
    else:
        CPMovingAvg200DaysStatus = 'uniform'

    if (CPMovingAvg50Days < LatestClosingPrice):
        CPMovingAvg50DaysStatus = 'low'
    elif (CPMovingAvg50Days > LatestClosingPrice):
        CPMovingAvg50DaysStatus = 'high'
    else:
        CPMovingAvg50DaysStatus = 'uniform'

    if (CPMovingAvg30Days < LatestClosingPrice):
        CPMovingAvg30DaysStatus = 'low'
    elif (CPMovingAvg30Days > LatestClosingPrice):
        CPMovingAvg30DaysStatus = 'high'
    else:
        CPMovingAvg30DaysStatus = 'uniform'

    modifiedStockName = StockName.replace("'","''")

    dbCmd = open(UpsertStockEquitySummaryFile).read()
    dbCmd = dbCmd.rstrip()
    dbCmd = dbCmd.replace("SC_CODE", str(ScCode))
    dbCmd = dbCmd.replace("PROCESSED_DATE", str("'"+currentDate+"'"))
    dbCmd = dbCmd.replace("SC_NAME", str("'"+modifiedStockName + "'"))
    dbCmd = dbCmd.replace("CURRENT_CP", str(LatestClosingPrice))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_200D", str(CPMovingAvg200Days))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_50D", str(CPMovingAvg50Days))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_30D", str(CPMovingAvg30Days))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_200_STATUS", str("'"+ CPMovingAvg200DaysStatus +"'"))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_50_STATUS", str("'"+ CPMovingAvg50DaysStatus +"'"))
    dbCmd = dbCmd.replace("CP_MOVING_AVG_30_STATUS", str("'"+ CPMovingAvg30DaysStatus +"'"))
    dbCmd = dbCmd.replace("CREATED_DATE", str("'"+ currentTimeStamp + "'" ))
    dbCmd = dbCmd.replace("UPDATE_DATE", str("'"+ currentTimeStamp + "'" ))
    cDB.runCmd(dbCmd)



if __name__ == '__main__':
    myMain()