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
import { Product, Operation} from '../types';
import { useAPI } from "../hooks/useAPI";
import { generateUniqueId } from "../../lib/utils/idGenerator";
import { createProduct } from "../../lib/services";

function Inventory() {

    const initialPurchaseOrder = { items: [], date: '', type: '', user: '' };
    const initialProduct = {
        _id: "",
        quantity: 0,
        image: "",
        cost: 0,
        supplier: "",
        name: "",
        size: "",
        type: "",
        price: 0
    };

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState(initialProduct);
    const [trackedPO, setTrackedPO] = useState<Operation>(initialPurchaseOrder);

    const { isLoading, error, data } = useAPI(
        'inventories', 
        'inventories', 
        {
            
        }
        );

    const handleTermChange = (term: string) => {
        setSearchTerm(term);
    }

    const purchaseOrder = data && [...data]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const productDescription = name.split(" ");
        const productName = productDescription[0];
        const productSize= productDescription[1];
        const productTargetIndex = purchaseOrder.findIndex((product: Product) => product.name === productName && product.size === productSize);
        purchaseOrder[productTargetIndex]["quantity"] = Number(value);
    }

    const handlePurchaseSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const creationDate = `${date}/${month + 1}/${year}`;
        const trackedPurchaseOrder = {items: [...purchaseOrder]}
        setOpen(true);
        const updatedTrackedPurchasedOrder = {items: trackedPurchaseOrder.items.filter((product) => product.quantity > 0), date: creationDate, type: "purchase", user};
        setTrackedPO(updatedTrackedPurchasedOrder);
        // send purchaseOrder to DailyOps in DB and update Inventory in DB
    }

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProduct(prevProduct => ({
            ...prevProduct,
            _id: generateUniqueId(),
            quantity: 0,
            [name]: value.toLowerCase()
        }))
    };

    const handleProductCreation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createProduct(product);
            setProduct(initialProduct);
            return response
        } catch (error) {
            console.log(error)
        }
    };

    const filteredProducts = data && data.filter((product: Product) => product.name.toLowerCase().includes(searchTerm) || product.size.toLowerCase().includes(searchTerm))

    useEffect(() => {
        const userString = localStorage.getItem("user");

        if (userString !== null) {
            const user = JSON.parse(userString);
            setUser(user);
        } else {
        console.log("No 'user' data found in localStorage.");
    }
}, [trackedPO])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div className="page-wrapper">
            <MyModal open={open} trackedPO={trackedPO} setOpen={setOpen}/>
            <div className='accordion-wrapper'>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography variant="h5">Create Product</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form action="" className="form" onSubmit={handleProductCreation}>

                            <label htmlFor="image">Image:</label>
                            <input type="url" name='image' id='image' value={product.image} onChange={handleProductChange} placeholder="insert one drive embeded image url" required/>

                            <label htmlFor="cost">Cost:</label>
                            <input type="text" name='cost' id='cost' value={product.cost} onChange={handleProductChange} placeholder="insert cost with no symbols" required/>

                            <label htmlFor="price">Price:</label>
                            <input type="text" name='price' id='price' value={product.price} onChange={handleProductChange} placeholder="insert price with no symbols" required/>

                            <label htmlFor="supplier">Supplier:</label>
                            <input type="text" name='supplier' id='supplier' value={product.supplier} onChange={handleProductChange} placeholder="insert supplier name" required/>

                            <label htmlFor="name">Name:</label>
                            <input type="text" name='name' id='name' value={product.name} onChange={handleProductChange} placeholder="insert product name" required/>

                            <label htmlFor="size">Size:</label>
                            <input type="text" name='size' id='size' value={product.size} onChange={handleProductChange} placeholder="insert product size ag: 40g" required/>

                            <label htmlFor="type">Type:</label>
                            <input type="text" name='type' id='type' value={product.type} onChange={handleProductChange} placeholder="drink, product or supply ?" required/>

                            <button className="btn">Create Product</button>

                        </form>
                    </AccordionDetails>
                </Accordion>
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
                        <form action="" onSubmit={handlePurchaseSubmission}>
                            <div className="purchase-summary">
                                <button type="submit" className="btn btn-purchase">
                                    Purchase products
                                </button>
                            </div>
                            <div className="product-gal">    
                                {filteredProducts.filter((product: Product) => product.type !== "product").map((product: Product) => (
                                        <div className="product-card" key={product._id}>
                                            <LazyLoadImage src={product.image} alt={`gaseose ${product.name} de ${product.size}`} effect="blur" />
                                            <h5>{product.name.replace(/_/g, " ")}</h5>
                                            <p>{product.size}</p>
                                            <input type="number" min={0} placeholder="quantity" name={`${product.name} ${product.size}`} onChange={handleChange}/>
                                            <p className='outgoing-cash'>{`$${product.cost.toLocaleString()}`}</p>
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
                    <AccordionDetails>
                        <SearchBar handleTermChange={handleTermChange}/>
                        <div className="product-gal">    
                                {filteredProducts.filter((product: Product) => product.type !== "product").map((product: Product) => (
                                        <div className="product-card" key={product._id}>
                                            <LazyLoadImage src={product.image} alt={`gaseose ${product.name} de ${product.size}`} effect="blur" />
                                            <h5>{product.name.replace(/_/g, " ")}</h5>
                                            <p>{product.size}</p>
                                            <p>{product.quantity}</p>
                                            <p className='outgoing-cash'>{`$${product.cost.toLocaleString()}`}</p>
                                            <p>{product.supplier}</p>
                                        </div>
                                ))}                    
                            </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Inventory