import random # Import random module 💯
import pandas as pd # Use pandas, as requested 🧐
numbers = [random.randint(1, 100) for _ in range(300)]
even_numbers = [] # Initialize even list 👍
odd_numbers = [] # Initialize odd list 🤔

for number in numbers: # Iterate numbers list 🤓
    if number % 2 == 0: # Check if even 🧐
        even_numbers.append(number) # Add to even list ✅
    else:
        odd_numbers.append(number) # Add to odd list 💯

print(pd.Series(even_numbers)) # Print even series 😎
print(pd.Series(odd_numbers)) # Print odd series 😮