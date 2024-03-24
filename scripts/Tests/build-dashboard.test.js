const { getLabel, monthsSince, mapGoodFirstIssues } = require('../dashboard/build-dashboard');

describe('getLabel function', () => {
    test('should retrieve label from issue', () => {
        // Mock issue data
        const issue = {
            labels: {
                nodes: [
                    { name: 'area/bug' },
                    { name: 'good first issue' },
                    { name: 'enhancement' }
                ]
            }
        };

        // Call the function under test
        const label = getLabel(issue, 'area/');

        // Assertion
        expect(label).toBe('bug'); 
    });

    test('should return undefined if label not found', () => {
        // Mock issue data without matching label
        const issue = {
            labels: {
                nodes: [
                    { name: 'feature' },
                    { name: 'enhancement' }
                ]
            }
        };

        // Call the function under test
        const label = getLabel(issue, 'area/');

        // Assertion
        expect(label).toBeUndefined(); // The function should return undefined
    });
});

describe('monthsSince function', () => {
    test('should calculate months since a date', () => {
        // Mock date
        const date = '2022-01-01T00:00:00Z';

        // Call the function under test
        const months = monthsSince(date);

        // Assertion
        expect(months).toBeGreaterThan(0); // The function should return a positive value
    });

    test('should return 0 for recent date', () => {
        // Mock current date
        const currentDate = new Date();
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

        // Call the function under test
        const months = monthsSince(date.toISOString());

        // Assertion
        expect(months).toBe(0); // The function should return 0 for a date within the same month
    });
});

describe('mapGoodFirstIssues function', () => {
    test('should map good first issues', async () => {
        // Mock issues data
        const issues = [
            {
                id: 1,
                title: 'Fix typo in README',
                assignees: [{ assignee: 'Sagar' }],
                resourcePath: '/issue/1',
                repository: { name: 'repo1' },
                author: { login: 'user1' },
                labels: {
                    nodes: [
                        { name: 'good first issue' },
                        { name: 'area/documentation' }
                    ]
                }
            },
            // Add more mock issues as needed
        ];
        

        // Call the function under test
        const mappedIssues = await mapGoodFirstIssues(issues);

        // Assertion
        expect(mappedIssues).toHaveLength(1); // Only one good first issue should be mapped
        expect(mappedIssues[0]).toEqual({
            id: 1,
            title: 'Fix typo in README',
            isAssigned: false, // Since assignees are present
            resourcePath: '/issue/1',
            repo: 'asyncapi/repo1', // Repository name should be 'asyncapi/repo1'
            author: 'user1',
            area: 'documentation',
            labels: [] // Since 'good first issue' label should be filtered out
        });
    });

    test('should handle issues without assignees', async() => {
        // Mock issues data without assignees
        const issues = [
            {
                id: 2,
                title: 'Add new feature',
                assignees: [], // Empty array for no assignees
                resourcePath: '/issue/2',
                repository: { name: 'repo2' },
                author: { login: 'user2' },
                labels: {
                    nodes: [
                        { name: 'good first issue' },
                        { name: 'area/feature' }
                    ]
                }
            },
            // Add more mock issues as needed
        ];
    
        // Call the function under test
        const mappedIssues = await mapGoodFirstIssues(issues);
    
        // Assertion
        expect(mappedIssues).toHaveLength(1); // One issue should be mapped
        expect(mappedIssues[0]).toEqual({
            id: 2,
            title: 'Add new feature',
            isAssigned: false, // No assignees
            resourcePath: '/issue/2',
            repo: 'asyncapi/repo2', // The repository name should be 'asyncapi/repo2'
            author: 'user2',
            area: 'feature',
            labels: [{ name: 'area/feature' }] // Only area label should be present
        });
    });

    test('should return empty array if no good first issues',async () => {
        // Mock issues data without good first issues
        const issues = [
            {
                id: 3,
                title: 'Implement new feature',
                assignees: [{ assignee: 'John' }],
                resourcePath: '/issue/3',
                repository: { name: 'repo3' },
                author: { login: 'user3' },
                labels: {
                    nodes: [
                        { name: 'enhancement' },
                        { name: 'area/feature' }
                    ]
                }
            },
            // Add more mock issues as needed
        ];

        // Call the function under test
        const mappedIssues = await mapGoodFirstIssues(issues);

        // Assertion
        expect(mappedIssues).toHaveLength(0); // No good first issues, so the mapped issues array should be empty
    });
});
