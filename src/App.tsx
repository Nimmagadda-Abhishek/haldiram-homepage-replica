import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Index />
              </Layout>
            } />
            <Route path="/products" element={
              <Layout>
                <Products />
              </Layout>
            } />
            <Route path="/products/:section" element={
              <Layout>
                <Products />
              </Layout>
            } />
            <Route path="/product/:slugOrId" element={
              <Layout>
                <ProductDetail />
              </Layout>
            } />
            <Route path="/cart" element={
              <Layout>
                <Cart />
              </Layout>
            } />
            <Route path="/checkout" element={
              <Layout>
                <Checkout />
              </Layout>
            } />
            <Route path="/admin" element={
              <Layout showHeader={false} showFooter={false}>
                <Admin />
              </Layout>
            } />
            <Route path="/account" element={
              <Layout>
                <Account />
              </Layout>
            } />
            <Route path="/login" element={
              <Layout>
                <Login />
              </Layout>
            } />
            <Route path="/register" element={
              <Layout>
                <Register />
              </Layout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
