export const createCalendarEvent = async ({
    date,
    title,
    description
}: {
    date: string;
    title: string;
    description: string;
}) => {
    try {
        const response = await fetch('https://hook.eu2.make.com/991o4nfy6lvhchv1w8ert78sozrakn1n', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                title,
                description
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create calendar event: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
}
