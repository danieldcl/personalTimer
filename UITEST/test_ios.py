from appium import webdriver
import unittest
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.common.touch_actions import TouchActions
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC




class SampleTest(unittest.TestCase):
  def setUp(self):
    # setup with 15 new routines
    self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_capabilities = {
      "platformName": "iOS",
      "platformVersion": "13.3",
      "deviceName": "iPhone 8",
      "automationName": "XCUITest",
      "app": "/Users/dcliao/Library/Developer/Xcode/DerivedData/PersonalHIIT-evqgborhydgjuperzjewtynzpzqn/Build/Products/Debug-iphonesimulator/PersonalHIIT.app"
    })
    add_button = self.driver.find_element_by_id('add')
    self.number = 2
    for i in range(self.number):
      add_button.click()

  def tearDown(self):
    self.driver.quit()

  def test_updateFirstRoutineName(self):
    new_routines = self.driver.find_elements_by_xpath('//XCUIElementTypeStaticText[@name="New routine"]')
    self.assertEqual(len(new_routines), self.number)
    new_routines[0].click()
    routineName = self.driver.find_elements_by_xpath('//XCUIElementTypeTextField[@name="Routine Name:"]')[0]
    routineName.clear()
    routineName.send_keys("first routine")
    routineName.send_keys(Keys.RETURN)

    self.driver.find_element_by_accessibility_id('Save Routine').click()
    self.driver.find_element_by_accessibility_id('Save Routine').click()
    try:
      elm = WebDriverWait(self.driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, '//XCUIElementTypeOther[@name="main"]/XCUIElementTypeOther[1]/XCUIElementTypeOther[1]'))
      )
      print(elm)
    except Exception as e:
      print(e)
    
if __name__=='__main__':
  suite = unittest.TestLoader().loadTestsFromTestCase(SampleTest)
  unittest.TextTestRunner(verbosity=2).run(suite)