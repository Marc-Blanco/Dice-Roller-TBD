import pyautogui
import time

def write_and_enter(letter, interval_minutes):
    interval_seconds = interval_minutes * 60
    while True:
        pyautogui.typewrite(letter)
        pyautogui.press('enter')
        time.sleep(interval_seconds)

if __name__ == "__main__":
    letter_to_write = "A"  # Change this to the letter you want to write
    interval = 5  # Interval in minutes
    print(f"Starting to write '{letter_to_write}' and press Enter every {interval} minutes.")
    write_and_enter(letter_to_write, interval)