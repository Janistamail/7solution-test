import type { DepartmentData, User } from "./types";

export function transformUserData(users: User[]): DepartmentData {
  if (users.length === 0) {
    return {};
  }
  const departmentMap = new Map<
    string,
    {
      males: User[];
      females: User[];
      ages: number[];
      hairColors: Map<string, number>;
      addressUsers: Map<string, string>;
    }
  >();

  for (const user of users) {
    const department = user.company.department;

    // Initialize department if it doesn't exist
    if (!departmentMap.has(department)) {
      departmentMap.set(department, {
        males: [],
        females: [],
        ages: [],
        hairColors: new Map<string, number>(),
        addressUsers: new Map<string, string>(),
      });
    }

    const deptData = departmentMap.get(department)!;

    // Add user to gender array
    if (user.gender === "male") {
      deptData.males.push(user);
    } else if (user.gender === "female") {
      deptData.females.push(user);
    }

    // Add age
    deptData.ages.push(user.age);

    // Add hair color
    const hairColor = user.hair.color;
    deptData.hairColors.set(
      hairColor,
      (deptData.hairColors.get(hairColor) || 0) + 1
    );

    // Add address mapping
    const fullName = `${user.firstName}${user.lastName}`;
    deptData.addressUsers.set(fullName, user.address.postalCode);
  }

  // Convert Map to array
  const result: DepartmentData = {};

  departmentMap.forEach((data, department) => {
    // Sort ages
    const sortedAges = [...data.ages].sort((a, b) => a - b);
    const minAge = sortedAges[0];
    const maxAge = sortedAges[sortedAges.length - 1];

    // Convert hair colors Map to object
    const hairColors: { [color: string]: number } = {};
    data.hairColors.forEach((count, color) => {
      hairColors[color] = count;
    });

    // Convert address users Map to object
    const addressUsers: { [name: string]: string } = {};
    data.addressUsers.forEach((postalCode, name) => {
      addressUsers[name] = postalCode;
    });

    // Create department summary
    result[department] = {
      male: data.males.length,
      female: data.females.length,
      ageRange: `${minAge}-${maxAge}`,
      hair: hairColors,
      addressUser: addressUsers,
    };
  });

  return result;
}
