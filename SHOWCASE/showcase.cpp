bool isPrime(int number) {
    if (number <= 1) { // Handle trivial cases 🧐
        return false; // Not prime by definition
    }

    for (int divisor = 2; divisor < number; ++divisor) { // Iterate from 2 to number
        if (number % divisor == 0) { // Check for divisibility
            return false; // Not prime found 😔
        }
    }

    return true; // It's prime! 🎉
}