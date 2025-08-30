# Arduino 4x4 Keypad + LCD + Servo Guide

This document explains how to create an Arduino project where entering the correct 4-digit code on a 4x4 keypad shows "Access Granted" on an LCD and moves a servo motor from 0° to 90° for 30 seconds before returning to 0°.

---

## Components Needed

* Arduino Uno
* 4x4 Keypad
* 16x2 LCD (with backlight)
* Servo Motor
* 10k potentiometer (for LCD contrast)
* 220Ω resistor (for LCD backlight)
* Jumper wires
* Breadboard (optional)

---

## Wiring

### 1. LCD 16x2 (4-bit mode)

| LCD Pin  | Connects To                 | Notes                 |
| -------- | --------------------------- | --------------------- |
| VSS      | GND                         | Ground                |
| VDD      | +5V                         | Power                 |
| VO       | Middle pin of 10k pot       | Contrast              |
| RS       | D7                          | Arduino digital pin 7 |
| E        | D6                          | Arduino digital pin 6 |
| D4       | D5                          | Arduino digital pin 5 |
| D5       | D4                          | Arduino digital pin 4 |
| D6       | D3                          | Arduino digital pin 3 |
| D7       | D2                          | Arduino digital pin 2 |
| A (LED+) | +5V (through 220Ω resistor) | Backlight +           |
| K (LED-) | GND                         | Backlight -           |

* 10k potentiometer: one side to +5V, one side to GND, middle to VO (pin 3).

### 2. 4x4 Keypad

| Keypad Pin | Arduino Pin |
| ---------- | ----------- |
| Row 1      | 9           |
| Row 2      | 8           |
| Row 3      | A3          |
| Row 4      | A2          |
| Col 1      | A1          |
| Col 2      | A0          |
| Col 3      | 13          |
| Col 4      | 12          |

> Keypad does **not** need power, only the 8 signal wires.

### 3. Servo Motor

| Servo Pin | Arduino Pin |
| --------- | ----------- |
| Signal    | 10          |
| VCC       | +5V         |
| GND       | GND         |

> Use an external 5V supply if the servo draws too much current.

---

## Arduino Code

[Click here to view/download the Arduino code](https://example.com/arduino_servo_keypad_lcd.ino)

```cpp
#include <Keypad.h>
#include <LiquidCrystal.h>
#include <Servo.h>

LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
Servo myServo;
const int servoPin = 10;

const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 8, A3, A2};
byte colPins[COLS] = {A1, A0, 13, 12};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String inputCode = "";
String correctCode = "0000";

void showInput() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Enter Passcode:");
  lcd.setCursor(0, 1);
  for (int i = 0; i < inputCode.length(); i++) {
    lcd.print('*');
  }
}

void setup() {
  myServo.attach(servoPin);
  myServo.write(0);
  lcd.begin(16, 2);
  lcd.print("Enter Passcode:");
}

void loop() {
  char key = keypad.getKey();
  if (key) {
    if (key == '*') {
      if (inputCode.length() > 0) {
        inputCode.remove(inputCode.length() - 1);
      }
    } else if (key >= '0' && key <= '9') {
      if (inputCode.length() < 4) {
        inputCode += key;
      }
    }

    showInput();

    if (inputCode.length() == 4) {
      if (inputCode == correctCode) {
        lcd.clear();
        lcd.print("Access Granted");
        myServo.write(90);
        delay(30000);
        myServo.write(0);
      } else {
        lcd.clear();
        lcd.print("Access Denied");
        delay(2000);
      }
      inputCode = "";
      lcd.clear();
      lcd.print("Enter Passcode:");
    }
  }
}
```
