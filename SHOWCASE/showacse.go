func reverse(inputString string) string {
	runes := []rune(inputString) // Convert string to runes
	for start, end := 0, len(runes)-1; start < end; start, end = start+1, end-1 { // Iterate until middle 🧮
		runes[start], runes[end] = runes[end], runes[start] // Swap characters 🔄
	}
	return string(runes) // Return reversed string 🥳
}