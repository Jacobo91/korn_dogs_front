import { products } from "../../lib/utils/products"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { SearchBar } from "../components";
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyModal from "../components/MyModal";
import {PurchaseOrder} from '../types'

function Inventory() {

    const initialPurchaseOrder = { items: [], date: '', type: '', user: '' };

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [trackedPO, setTrackedPO] = useState<PurchaseOrder>(initialPurchaseOrder);

    const colors = {
        manzana: "#DE3478",
        colombiana: "#F6650D",
        pepsi: "black",
        sevenup: "#3BB46D",
        uva: "#BF2AA3"
    };

    const handleTermChange = (term: string) => {
        setSearchTerm(term);
    }

    const purchaseOrder = [...products];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const productDescription = name.split(" ");
        const productName = productDescription[0];
        const productSize= productDescription[1];
        const productTargetIndex = purchaseOrder.findIndex((product) => product.name === productName && product.size === productSize);
        purchaseOrder[productTargetIndex]["quantity"] = Number(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const creationDate = `${date}/${month + 1}/${year}`;
        const trackedPurchaseOrder = {items: [...purchaseOrder]}
        setOpen(true);
        const updatedTrackedPurchasedOrder = {items: trackedPurchaseOrder.items.filter((product) => product.quantity > 0), date: creationDate, type: "purchase", user};
        setTrackedPO(updatedTrackedPurchasedOrder)
        // send purchaseOrder to DailyOps in DB and update Inventory in DB
    }

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.size.toLowerCase().includes(searchTerm))

    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (userString !== null) {
            const user = JSON.parse(userString);
            setUser(user);
        } else {
        console.log("No 'user' data found in localStorage.");
    }
}, [trackedPO])


    return (
        <div className="page-wrapper">
            <MyModal open={open} trackedPO={trackedPO} setOpen={setOpen}/>
            <div className='inner-wrapper'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h5">Order Products</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SearchBar handleTermChange={handleTermChange}/>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="purchase-summary">
                                <button type="submit" className="btn btn-purchase">
                                    Purchase products
                                </button>
                            </div>
                            <div className="product-gal">    
                                {filteredProducts.map((product) => (
                                        <div className="product-card" key={product._id}>
                                            <LazyLoadImage src={product.image} alt={`gaseose ${product.name} de ${product.size}`} effect="blur" />
                                            <h5>{product.name.replace(/_/g, " ")}</h5>
                                            <p style={{ color: colors[product.name.replace("_", "") as keyof typeof colors] || "black" }}>{product.size}</p>
                                            <input type="number" min={0} placeholder="quantity" name={`${product.name} ${product.size}`} onChange={handleChange}/>
                                            <p>{`$${product.cost.toLocaleString()}`}</p>
                                            <p>{product.supplier}</p>
                                        </div>
                                ))}                    
                            </div>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h5">Inventory</Typography>
                    </AccordionSummary>
                </Accordion>
            </div>
        </div>
    )
}

export default Inventory