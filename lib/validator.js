export function validateInput(input) {
    if (!input || typeof input !== "string") {
        return {
            valid: false,
            message: "Input must be a non-empty string",
        };
    }

    // Additional validation logic can be added here

    return { valid: true };
}
