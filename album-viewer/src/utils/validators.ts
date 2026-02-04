// Validators for album data and forms

/**
 * Validates a date string in French format (DD/MM/YYYY) and converts it to a Date object.
 * @param dateString - The date string to validate and convert.
 * @returns The Date object if valid, otherwise null.
 */
export function validateDate(dateString: string): Date | null {
  // Regex to match DD/MM/YYYY format
  const frenchDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(frenchDateRegex);

  if (!match) {
    return null;
  }

  const [, dayStr, monthStr, yearStr] = match;
  const day = parseInt(dayStr!, 10);
  const month = parseInt(monthStr!, 10) - 1; // Months are 0-indexed in Date
  const year = parseInt(yearStr!, 10);

  // Create the date
  const date = new Date(year, month, day);

  // Check if the date is valid by comparing components
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

/**
 * Validates if a string is a valid GUID (UUID) format.
 * @param guid - The string to validate.
 * @returns True if the string is a valid GUID, otherwise false.
 */
export function validateGuid(guid: string): boolean {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return guidRegex.test(guid);
}

/**
 * Validates if a string is a valid IPv6 address format.
 * @param ipv6 - The string to validate.
 * @returns True if the string is a valid IPv6 address, otherwise false.
 */
export function validateIPV6(ipv6: string): boolean {
  // Comprehensive IPv6 regex (supports compressed notation, IPv4 mapped, etc.)
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv6Regex.test(ipv6);

}