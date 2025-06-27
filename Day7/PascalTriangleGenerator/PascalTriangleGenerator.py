def generate_pascals_triangle(n):
    """
    Generate Pascal's Triangle up to n rows.
    
    Parameters:
    - n (int): Number of rows for Pascal's Triangle.
    
    Returns:
    - list: A list of lists, where each inner list represents a row of Pascal's Triangle.
    """
    
    # Base case: If n is 0, return an empty list
    if n == 0:
        return []
    
    # Initialize Pascal's Triangle with the first row
    pascals_triangle = [[1]]
    
    # Generate each subsequent row
    for i in range(1, n):
        previous_row = pascals_triangle[-1]
        new_row = [1]
        
        # Calculate the middle values for the new row
        for j in range(1, i):
            new_row.append(previous_row[j-1] + previous_row[j])
        
        new_row.append(1)
        pascals_triangle.append(new_row)
    
    return pascals_triangle
# Example usage:

print(generate_pascals_triangle(3))  # Expected Output: [[1], [1, 1], [1, 2, 1]]
print(generate_pascals_triangle(5))  # Expected Output: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]