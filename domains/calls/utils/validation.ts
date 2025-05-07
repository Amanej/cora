/**
 * Utility functions for call validation checks
 */

/**
 * Checks if the person reached is the wrong person
 * @param wasRightPerson - Boolean indicating if the right person was reached
 * @returns boolean indicating if the wrong person was reached
 */
export const isContactWrongPerson = (wasRightPerson: boolean | undefined): boolean => {
    return typeof wasRightPerson === "boolean" && !wasRightPerson;
};

/**
 * Checks if the number reached is the wrong number
 * @param wasRightNumber - Boolean indicating if the right number was reached
 * @returns boolean indicating if the wrong number was reached
 */
export const isContactWrongNumber = (wasRightNumber: boolean | undefined): boolean => {
    return typeof wasRightNumber === "boolean" && !wasRightNumber;
};

/**
 * Checks if either the wrong person or wrong number was reached
 * @param wasRightPerson - Boolean indicating if the right person was reached
 * @param wasRightNumber - Boolean indicating if the right number was reached
 * @returns boolean indicating if either the wrong person or wrong number was reached
 */
export const isContactWrong = (wasRightPerson: boolean | undefined, wasRightNumber: boolean | undefined): boolean => {
    return isContactWrongPerson(wasRightPerson) || isContactWrongNumber(wasRightNumber);
}; 