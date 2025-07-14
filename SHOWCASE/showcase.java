int factorial(int number) {
    int product = 1; // Initialize product to 1
    for (int i = 1; i <= number; ++i) { // Loop through numbers 🔢
        product *= i; // Multiply product by i 🧮
    }
    return product; // Return the factorial value
}