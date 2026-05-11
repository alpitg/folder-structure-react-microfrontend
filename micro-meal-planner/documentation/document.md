
### Meal planner request
```shell
curl 'http://localhost:5173/api/meal-planner/meal-requests.json' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Origin: http://localhost:5173' \
  -H 'Referer: http://localhost:5173/meal-request' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGFiNDQyMmU5MTYzYjMzNDc0ZGE1NzciLCJlbWFpbCI6bnVsbCwiZXhwIjoxNzc3MTExOTIwfQ.KUrfOUUinZzkBYV7XccoD0Cc0u94TiW5Dc3m1OkTJWc' \
  -H 'content-type: application/json' \
  -H 'sec-ch-ua: "Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"planOption":"today","vegNonVeg":"veg","region":"north","highProtein":false,"quickCooking":false,"maidModeEnabled":false,"maidVoiceLanguage":"none","maidLessSpicy":false,"maidEasyCook":false}'
```