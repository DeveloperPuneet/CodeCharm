bool isPrime(int n) {
    if (n <= 1) return false; // Handle trivial cases 🙅
    for (int i = 2; i < n; i++) { // Iterate from 2 to n-1
        if (n % i == 0) return false; // Check for divisibility 🤔
    }
    return true; // It's a prime number! 🎉
}