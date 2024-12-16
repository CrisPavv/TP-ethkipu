import React, { useState } from 'react';
import { ethers } from 'ethers';

// Dirección del contrato y ABI
const contractAddress = '0x51f65464D9feeD4bA28Fd34b57fd27c9971Cd49b';
const abi = [
    "function initializePool(uint256 amountA, uint256 amountB) external onlyOwner",
    "function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner",
    "function swapAForB(uint256 amountA) external",
    "function swapBForA(uint256 amountB) external",
    "function removeLiquidity(uint256 amountA, uint256 amountB) external onlyOwner",
    "function getReserves() external view returns (uint256, uint256)",
    "function getPrice() external view returns (uint256 tokenAEquivalent, uint256 tokenBEquivalent)"
];

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('');

    // Función para conectar MetaMask
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const tempProvider = new ethers.BrowserProvider(window.ethereum);
            await tempProvider.send("eth_requestAccounts", []);
            const tempSigner = tempProvider.getSigner();
            const tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
            setProvider(tempProvider);
            setSigner(tempSigner);
            setContract(tempContract);
            console.log('Conectado a MetaMask');
            setMessage('Conectado a MetaMask');
        } else {
            alert('Por favor, instala MetaMask');
        }
    };

    // Función para inicializar el pool
    const initializePool = async () => {
        const amountA = ethers.utils.parseUnits("1000", 18); // 1000 TokenA
        const amountB = ethers.utils.parseUnits("4000", 18); // 4000 TokenB

        try {
            const tx = await contract.initializePool(amountA, amountB);
            await tx.wait();
            setMessage('Pool inicializado con éxito');
            console.log("Pool inicializado con éxito");
        } catch (error) {
            setMessage('Error al inicializar el pool');
            console.error("Error al inicializar el pool:", error);
        }
    };

    // Función para agregar liquidez al pool
    const addLiquidity = async () => {
        const amountA = ethers.utils.parseUnits("500", 18); // 500 TokenA
        const amountB = ethers.utils.parseUnits("2000", 18); // 2000 TokenB

        try {
            const tx = await contract.addLiquidity(amountA, amountB);
            await tx.wait();
            setMessage('Liquidez agregada con éxito');
            console.log("Liquidez agregada con éxito");
        } catch (error) {
            setMessage('Error al agregar liquidez');
            console.error("Error al agregar liquidez:", error);
        }
    };

    // Función para retirar liquidez del pool
    const removeLiquidity = async () => {
        const amountA = ethers.utils.parseUnits("500", 18); // 500 TokenA
        const amountB = ethers.utils.parseUnits("2000", 18); // 2000 TokenB

        try {
            const tx = await contract.removeLiquidity(amountA, amountB);
            await tx.wait();
            setMessage('Liquidez retirada con éxito');
            console.log("Liquidez retirada con éxito");
        } catch (error) {
            setMessage('Error al retirar liquidez');
            console.error("Error al retirar liquidez:", error);
        }
    };

    // Función para realizar un swap de TokenA por TokenB
    const swapAForB = async () => {
        const amountA = ethers.utils.parseUnits("100", 18); // 100 TokenA

        try {
            const tx = await contract.swapAForB(amountA);
            await tx.wait();
            setMessage('Swap realizado de TokenA por TokenB');
            console.log("Swap realizado de TokenA por TokenB");
        } catch (error) {
            setMessage('Error al hacer el swap');
            console.error("Error al hacer el swap:", error);
        }
    };

    // Función para realizar un swap de TokenB por TokenA
    const swapBForA = async () => {
        const amountB = ethers.utils.parseUnits("100", 18); // 100 TokenB

        try {
            const tx = await contract.swapBForA(amountB);
            await tx.wait();
            setMessage('Swap realizado de TokenB por TokenA');
            console.log("Swap realizado de TokenB por TokenA");
        } catch (error) {
            setMessage('Error al hacer el swap');
            console.error("Error al hacer el swap:", error);
        }
    };

    // Función para obtener las reservas del pool
    const getReserves = async () => {
        try {
            const reserves = await contract.getReserves();
            setMessage(`Reservas del pool: ${reserves[0].toString()} TokenA, ${reserves[1].toString()} TokenB`);
            console.log("Reservas del pool:", reserves);
        } catch (error) {
            setMessage('Error al obtener reservas');
            console.error("Error al obtener reservas:", error);
        }
    };

    // Función para obtener el precio de los tokens
    const getPrice = async () => {
        try {
            const [tokenAEquivalent, tokenBEquivalent] = await contract.getPrice();
            setMessage(`Precio de los tokens: ${tokenAEquivalent.toString()} TokenA, ${tokenBEquivalent.toString()} TokenB`);
            console.log("Precio de los tokens:", tokenAEquivalent.toString(), tokenBEquivalent.toString());
        } catch (error) {
            setMessage('Error al obtener precio');
            console.error("Error al obtener precio:", error);
        }
    };

    return (
        <div>
            <h1>Interactuar con SimpleDEX</h1>
            <button onClick={connectWallet}>Conectar Wallet</button>
            <button onClick={initializePool}>Inicializar Pool</button>
            <button onClick={addLiquidity}>Agregar Liquidez</button>
            <button onClick={removeLiquidity}>Retirar Liquidez</button>
            <button onClick={swapAForB}>Swap Token A por B</button>
            <button onClick={swapBForA}>Swap Token B por A</button>
            <button onClick={getReserves}>Obtener Reservas</button>
            <button onClick={getPrice}>Obtener Precio</button>
            <p>{message}</p>
        </div>
    );
}

export default App;
