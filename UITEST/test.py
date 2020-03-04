from appium import webdriver

desired_cap = {
  "platformName": "iOS",
  "platformVersion": "13.3",
  "deviceName": "iPhone 8",
  "automationName": "XCUITest",
  "app": "/Users/dcliao/Library/Developer/Xcode/DerivedData/PersonalHIIT-evqgborhydgjuperzjewtynzpzqn/Build/Products/Debug-iphonesimulator/PersonalHIIT.app"
}

driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_cap)

add_button = driver.find_element_by_id('add')
add_button.click()
new_routines = driver.find_elements_by_xpath('//XCUIElementTypeStaticText[@name="New routine"]')
new_routines[0].click()




# driver.quit()