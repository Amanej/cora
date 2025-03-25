export interface Variable {
  name: string;
}

/**
 * Extracts variables wrapped in {{}} from a text string
 * @param text The text to extract variables from
 * @returns Array of Variable objects containing name and position of each variable
 */
export const extractVariables = (text: string): Variable[] => {
  const variableSet = new Set<string>();
  const regex = /\{\{([^}]+)\}\}/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    variableSet.add(match[1]);
  }

  return Array.from(variableSet).map(name => ({ name }));
};
