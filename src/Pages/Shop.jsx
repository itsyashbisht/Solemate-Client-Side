import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import Navigation from '../layouts/Navigation';
import { useState } from 'react';

export default function Shop () {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation/>
      <main className="flex-grow">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <ProductGrid searchTerm={searchTerm}/>
      </main>
    </div>
  );
}
