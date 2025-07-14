def factorial(number):
    if number < 0:
        raise ValueError("No negative factorials 🤔")

    result = 1 # Initialize result variable 💯
    for i in range(1, number + 1): # Loop through numbers
        result *= i # Multiply by current number
    return result # Return final result 🥳