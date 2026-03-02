import cv2
import sys
import json

img_path = sys.argv[1]

img = cv2.imread(img_path)
img = cv2.resize(img, (500,500))

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

lower = (0,40,40)
upper = (25,255,255)

mask = cv2.inRange(hsv, lower, upper)

contours,_ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

count = 0
for c in contours:
    if cv2.contourArea(c) > 50:
        count += 1

severity = "Mild"
if count > 25:
    severity = "Severe"
elif count > 10:
    severity = "Moderate"

print(json.dumps({
    "spots": count,
    "severity": severity
}))