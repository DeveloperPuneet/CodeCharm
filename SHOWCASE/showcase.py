def factorial(number):
    if number < 0:
        raise ValueError("Negative numbers not allowed") # 🚫 Negative numbers
    product = 1 # Initialize product
    for current_number in range(1, number + 1): # Iterate through numbers
        product *= current_number # Multiply the product 💪
    return product # Return the result 💯