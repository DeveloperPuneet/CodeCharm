func reverse(s string) string {
    r := []rune(s) // Convert to rune slice
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i] // Swap elements 🔄
    }
    return string(r) // Return reversed string
}