import { useAPI } from "../hooks/useAPI"

function DailyOps() {

    const {isLoading, error, data} = useAPI('daily-ops', 'get-operations', {})

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default DailyOps