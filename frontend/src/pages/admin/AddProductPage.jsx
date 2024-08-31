import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Spinner, FormWrapper, LoadingErrorWrapper } from "../../components";
import {
    useUpdateProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../store/productsApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AddProductPage = () => {
    const { id: productId } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState("");
    const [description, setDescription] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductByIdQuery(productId);
    const [updateProduct, { isLoading: updateProductLoading }] =
        useUpdateProductMutation();
    const [uploadImage, { isLoading: imageLoading }] =
        useUploadProductImageMutation();

    const navigate = useNavigate();

    const onUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.status);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                inStock,
                description,
            };
            const res = await updateProduct(updatedProduct);
            navigate("/admin/productlist");
        } catch (err) {
            toast.error(err?.data?.message || err?.status);
        }
    };

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setInStock(product.inStock);
            setDescription(product.description);
        }
    }, [product]);

    return (
        <>
            <Link to="/admin/productList" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormWrapper>
                <h1>Update Product</h1>
                {updateProductLoading && <Spinner />}
                <LoadingErrorWrapper isLoading={isLoading} error={error}>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="name" className="my-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price" className="my-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="imageUrl" className="my-3">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                disabled
                            ></Form.Control>
                        </Form.Group>
                        <Form.Control
                            type="file"
                            label={"choose File"}
                            onChange={onUploadImage}
                            disabled={imageLoading}
                        ></Form.Control>
                        <Form.Group controlId="brand" className="my-3">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="brand" className="my-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="inStock" className="my-3">
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description" className="my-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mt-2"
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                    </Form>
                </LoadingErrorWrapper>
            </FormWrapper>
        </>
    );
};
