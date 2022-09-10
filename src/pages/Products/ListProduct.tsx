import {
  Grid,
  Paper,
  Typography,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Button,
  Modal,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import {
  apiDeleteProduct,
  apiListProduct,
  GetProductDto,
} from "../../api/axios/product";
import { NotifContext } from "../../context";
import FormProducts from "./FormProduct";

const ListProducts = () => {
  const notifContext = useContext(NotifContext);
  const [listProduct, setListProduct] = useState<GetProductDto[] | null>(null);
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
  });
  const [selectedProduct, setSelectedProduct] = useState<GetProductDto | null>(
    null
  );
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  useEffect(() => {
    getListProduct();
  }, [query]);

  const getListProduct = () => {
    apiListProduct(query.limit, query.page)?.then((res) => {
      setListProduct(res.data);
    });
  };

  const deleteProduct = (id: string) => {
    apiDeleteProduct(id)
      ?.then((res) => {
        getListProduct();
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
      });
  };

  const showModalUpdateProduct = (product: GetProductDto) => {
    setSelectedProduct(product);
    setOpenModalUpdate(true);
  };
  const closeModalUpdateProduct = () => {
    setSelectedProduct(null);
    setOpenModalUpdate(false);
  };

  return (
    <>
      {selectedProduct && (
        <Modal open={openModalUpdate} onClose={closeModalUpdateProduct}>
            <FormProducts
              id={selectedProduct?.id}
              dataDefault={{
                name: selectedProduct.name,
                stock: selectedProduct.stock,
                category_id: selectedProduct.category_id,
                description: selectedProduct.description,
              }}
              afterSubmitCallback={() => {
                getListProduct();
                closeModalUpdateProduct();
              }}
              onClose={() => closeModalUpdateProduct()}
            />
        </Modal>
      )}
      <Modal open={openModalCreate} onClose={() => setOpenModalCreate(false)}>
          <FormProducts
            afterSubmitCallback={() => {
              getListProduct();
              setOpenModalCreate(false);
            }}
            onClose={() => setOpenModalCreate(false)}
          />
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Paper
          style={{
            padding: "24px",
          }}
        >
          <Grid display="flex" mb={4}>
            <Typography variant="h2">List Product</Typography>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenModalCreate(true);
            }}
          >
            New Product
          </Button>
          <Grid display="flex" direction="column" gap={2} mt={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProduct &&
                    listProduct.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.stock}</TableCell>
                        <TableCell align="right">{row.category.name}</TableCell>
                        <TableCell align="right">
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              deleteProduct(row.id);
                            }}
                          >
                            delete
                          </Button>
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => {
                              showModalUpdateProduct(row);
                            }}
                          >
                            update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default ListProducts;
