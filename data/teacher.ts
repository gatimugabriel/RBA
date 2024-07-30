export type UpcomingClasses = {
    id: number;
    subject: string;
    class: string;
    time: string
}

export type RecentAssignment = {
    id: number;
    title: string;
    class: string;
    dueDate: string
}

export type TeacherData = {
    name: string;
    subjects: [string],
    upcomingClasses: [UpcomingClasses] | null
    recentAssignments: [RecentAssignment] | null
}

export type TeacherDataProps = {
    TeacherData: TeacherData | null
}

export const teacherData = {
    name: "Teacher Doe",
    subjects: ["Mathematics", "Physics"],
    upcomingClasses: [
        { id: 1, subject: "Mathematics", class: "10A", time: "10:00 AM" },
        { id: 2, subject: "Physics", class: "11B", time: "2:00 PM" },
    ],
    recentAssignments: [
        { id: 1, title: "Algebra Quiz", class: "10A", dueDate: "2023-07-25" },
        { id: 2, title: "Physics Lab Report", class: "11B", dueDate: "2023-07-28" },
    ],
};
