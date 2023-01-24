import MenuIcon from '@mui/icons-material/Menu'
import {
    AccountCircle,
    NotificationsActive,
    Dashboard,
    IntegrationInstructions,
    Person,
    Timeline,
    Engineering,
    LocalAirport
} from '@mui/icons-material'
export const ProfileMenu = [
    {
        name: 'Personal',
        url: '/personal',
        id: 1
    },
    {
        name: 'Emergency',
        url: '/emergency',
        id: 2
    },
    {
        name: 'Qualification',
        url: '/qualification',
        id: 3
    },
    {
        name: 'Licenses',
        url: '/licenses',
        id: 4
    },
    {
        name: 'Experience',
        url: '/experience',
        id: 5
    },
    {
        name: 'Other',
        url: '/other',
        id: 6
    },
]
export const SideBarMenu = [
    {
        name: 'Home',
        url: '/dashboard',
        role: [1,2],
        id: 1,
        ico: 'home.png'
    },
    {
        name: 'Home',
        url: '/dashboard',
        role: [3,4],
        id: 2,
        ico: 'home.png',
        children: [
            // {
            //     name: 'Home Analysis',
            //     url: '/dashboard',
            //     id: 9,
            //     ico: 'home.png',
            // },
            
            {
                name: 'Student Analysis',
                url: '/student-analysis',
                id: 10,
                ico: 'student_analytics.png',
            },
            {
                name: 'Instructor Analysis',
                url: '/instructor-analysis',
                id: 11,
                ico: 'instructor_analysis.png'
            },
            {
                name: 'Aircraft Analysis',
                url: '/aircraft-analysis',
                id: 9,
                ico: 'aircraft-analysis.png',
            },
            // {
            //     name: 'Aircraft Analysis',
            //     url: '/aircraft-analysis',
            //     id: 2,
            //     ico: <LocalAirport style={{ fontSize: '26px', color: '#ffff' }} />
            // },
        ]
    },
    // {
    //     name: 'Aircraft Analysis',
    //     url: '',
    //     role: [3],
    //     id: 1,
    //     ico: <Timeline style={{ fontSize: '26px', color: '#ffff' }} />,
    //     children: [
    //         {
    //             name: 'Maintenece',
    //             url: '/maintenece',
    //             id: 1,
    //             ico: <Engineering style={{ fontSize: '26px', color: '#ffff' }} />,
    //         },
    //         {
    //             name: 'Roster',
    //             url: '/roster',
    //             id: 2,
    //             ico: <LocalAirport style={{ fontSize: '26px', color: '#ffff' }} />
    //         },
    //     ]
    // },
    {
        name: 'Roster',
        url: '/roster',
        role: 'all',
        id: 3,
        ico: 'roster.png'
    },
    {
        name: 'Students',
        url: '/students',
        role: [3,4],
        id: 5,
        ico: 'student.png'
    },
    {
        name: 'Instructors',
        url: '/instructors',
        role: [3,4],
        id: 6,
        ico: 'instructor.png'
    }
    ,
    {
        name: 'Aircraft',
        url: '/aircraft',
        role: [3,4],
        id: 7,
        ico: 'aircraft.png'
    },
    {
        name: 'Maintenance',
        url: '/maintenece',
        role: [3,4],
        id: 4,
        ico: 'maintenance.png'
    }
]