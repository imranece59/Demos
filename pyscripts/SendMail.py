import smtplib
import base64
import sys
import os

from email import encoders
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

sys.dont_write_bytecode = True
SENDER_ID = 'advancedstockanalytics@gmail.com'
SENDER_PASS = 'YWR2YW5jZWRzdG9ja2FuYWx5dGljczEyMyQ='

'''
*** This is a multiline comment ***
Message format:
    'TO'          : <To id string>
    'CC'          : <CC id string>
    'Subject'     : <Message Subject>
    'Body'        : <Body of the message>
    'AttachCount' : <Count of attachements>
    'Attachments' : <Attachements dictionary>
            {
                1 : [ <Attachment>, <Attachment Type> ],
                2 : [ <Attachment>, <Attachment Type> ],
                3 : [ <Attachment>, <Attachment Type> ],
                ...
            }
'''

def send_mail(message, sender_id, sender_pass, receiver_id):
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(sender_id, str(base64.b64decode(sender_pass)))
    server.sendmail(sender_id, receiver_id.split(","), message.as_string())
    server.quit()


def proceedWithAttachments(subject, toId, body, fileName, fileType):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = SENDER_ID
    msg['To'] = toId

    part1 = MIMEText(body, 'html')
    msg_a = MIMEBase('application', fileType)
    msg_a.set_payload(open(fileName, 'rb').read())
    encoders.encode_base64(msg_a)
    msg_a.add_header('Content-Disposition',
        'attachment; filename="%s"' % os.path.basename(fileName))

    msg.attach(part1)
    msg.attach(msg_a)
    send_mail(msg, SENDER_ID, SENDER_PASS, toId)

def proceed(subject, toId, body):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = SENDER_ID
    msg['To'] = toId

    part1 = MIMEText(body, 'html')
    msg.attach(part1)
    send_mail(msg, SENDER_ID, SENDER_PASS, toId)

def run(emailData):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = emailData.get('Subject', "No subject")
    msg['From'] = SENDER_ID
    msg['To'] = emailData.get('TO', "")
    msg['CC'] = emailData.get('CC', "")

    RECEIVER_IDS = [ emailData.get('TO', ""), emailData.get('CC', "")  ]
    RECEIVER_ID = ", ".join(RECEIVER_IDS)

    part1 = MIMEText(emailData.get('Body', ""), 'html')
    msg.attach(part1)

    attachCount = emailData.get('AttachCount', "NA")

    if (attachCount != "NA") :
        print "Attachment count:",attachCount
        attachments = emailData.get('Attachments', "NA")
        for i in attachments :
            attachName = attachments[i][0]
            attachType = attachments[i][1]

            msg_a = MIMEBase('application', attachType)
            msg_a.set_payload(open(attachName, 'rb').read())
            encoders.encode_base64(msg_a)
            msg_a.add_header('Content-Disposition',
                        'attachment; filename="%s"' % os.path.basename(attachName))
            msg.attach(msg_a)

    send_mail(msg, SENDER_ID, SENDER_PASS, RECEIVER_ID)


def setMyId(sender_id, sender_pass):
    global SENDER_ID
    SENDER_ID = sender_id
    global SENDER_PASS
    SENDER_PASS = base64.b64encode(bytes(sender_pass))

