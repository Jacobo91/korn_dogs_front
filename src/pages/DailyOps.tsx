import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAPI } from "../hooks/useAPI"
import { Operation } from '../types';

function DailyOps() {

    const {isLoading, error, data} = useAPI('daily-ops', 'get-operations', {});

    const sales = data && data.filter((dailyOp: Operation[]) => dailyOp.type === "sale");
    const preps = data && data.filter((dailyOp: Operation[]) => dailyOp.type === "prep");
    const purchases = data && data.filter((dailyOp: Operation[] ) => dailyOp.type === "purchase");

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div className="accordion-wrapper">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="h5">Sales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <pre>{JSON.stringify(sales, null, 2)}</pre>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="h5">Preps</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <pre>{JSON.stringify(preps, null, 2)}</pre>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant="h5">Purchase Orders</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <pre>{JSON.stringify(purchases, null, 2)}</pre>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default DailyOps