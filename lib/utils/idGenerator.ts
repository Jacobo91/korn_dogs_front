export const generateUniqueId = () => {
    const uniqueId = Date.now().toString(36); // Using current timestamp in base36
    const randomId = Math.random().toString(36).substr(2, 5); // Random number in base36
    return `${uniqueId}-${randomId}`;
}

