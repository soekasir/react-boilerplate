import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import {
  apiCategory,
  apiCreateProduct,
  apiUpdateProduct,
  ProductDto,
} from "../../api/axios/product";
import { NotifContext } from "../../context";
import CloseIcon from "@mui/icons-material/Close";

type Category = {
  name: string;
  id: string;
};

interface PropFormProduct {
  id?: string;
  dataDefault?: ProductDto;
  afterSubmitCallback?: () => void;
  onClose?: () => void;
}

const FormProducts: React.FC<PropFormProduct> = (props) => {
  const notifContext = useContext(NotifContext);
  const [formProduct, setFormProduct] = useState<ProductDto>({
    name: props.dataDefault?.name ?? "",
    stock: props.dataDefault?.stock ?? 0,
    description: props.dataDefault?.description ?? "",
    category_id: props.dataDefault?.category_id ?? "",
  });
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    apiCategory()
      ?.then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(formProduct);
  }, [formProduct]);

  const submit = () => {
    //create
    if (!props.id) {
      apiCreateProduct(formProduct)
        ?.then((res) => {
          notifContext?.setConfig({
            message: res.message,
            type: "success",
            open: true,
          });
        })
        .catch((err) => {
          notifContext?.setConfig({
            message: err.response.data.message,
            type: "error",
            open: true,
          });
        })
        .finally(() => {
          if (props.afterSubmitCallback) props.afterSubmitCallback();
        });
    }

    //update
    if (props.id) {
      apiUpdateProduct(props.id, formProduct)
        ?.then((res) => {
          notifContext?.setConfig({
            message: res.message,
            type: "success",
            open: true,
          });
        })
        .catch((err) => {
          notifContext?.setConfig({
            message: err.response.data.message,
            type: "error",
            open: true,
          });
        })
        .finally(() => {
          if (props.afterSubmitCallback) props.afterSubmitCallback();
        });
    }
  };

  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Paper
        style={{
          width: 700,
          padding: "24px",
          position: "relative",
        }}
      >
        {props.onClose && <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </div>}
        <Grid display="flex" mb={4}>
          <Typography variant="h2">Create Product</Typography>
        </Grid>
        <Grid display="flex" direction="column" gap={2} width="70%">
          <TextField
            type="text"
            label="product name"
            variant="outlined"
            onChange={(e) => {
              setFormProduct((prev) => ({ ...prev, name: e.target.value }));
            }}
            style={{
              width: 300,
            }}
            value={formProduct.name}
          />
          <TextField
            label="stock"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setFormProduct((prev) => ({
                ...prev,
                stock: parseInt(e.target.value),
              }));
            }}
            style={{
              width: 300,
            }}
            value={formProduct.stock}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formProduct.category_id}
              label="Category"
              onChange={(e) => {
                setFormProduct((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }));
              }}
            >
              {categories &&
                categories.map((category) => {
                  return (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <TextField
            label="description"
            type="text"
            variant="outlined"
            onChange={(e) => {
              setFormProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            style={{
              width: 500,
            }}
            value={formProduct.description}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "150px" }}
            onClick={submit}
          >
            {props.id ? "Update Product" : "Create Product"}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FormProducts;
