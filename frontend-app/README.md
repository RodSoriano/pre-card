# Summary
This is the front-end component of the application, known as PaymentForm. The PaymentForm component encapsulates all the necessary logic for its functionality.

On every input field where only numbers is needed the component validates that only digits can be entered. This being our first layer of validation.

It works in the opposite manner for a field that expects alphabetical characters only. It examines the input and verifies that there are no special characters or digits. If any of these characters are found, they will be replaced with a blank space.

Additionally, it includes a minor feature that allows the user to toggle the visibility of the security number for convenience. The input can also be blocked to display the data as a password field.

## Edge Cases
The test does not cover a few specific edge cases due to various reasons. In the following discussion, we will address these cases and propose potential solutions if possible.

### Expiration date input
This input has a specific issue where an end-user can enter a date format such as "January of 2024." Instead of being formatted as "01/24," if the user does not provide a leading zero, the input will appear as "12/4." In this case, the user would need to delete the entire input and start again by including a leading zero.

### Card holder input
Here we use a regular expression to evaluate that the input only holds alphabetic characters and white spaces. As off right now the end-user can enter as many white spaces as they want and the system will allow it.

### Error handling
To prioritize privacy, specific errors are not displayed to the end user. Instead, they are informed that there is incorrect information entered and are prompted to try again.

Once all the information meets the requirements it will only tell them that all the information was correct and they can close the current tab.