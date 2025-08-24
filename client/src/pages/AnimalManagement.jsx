import React, { useState } from "react";
import { Download, Heart } from "lucide-react";
import ActionButton from "../components/common/ActionButton";
import SearchAndFilter from "../components/common/SearchAndFilter";
import AnimalCard from "../components/animals/AnimalCard";
import AnimalTable from "../components/animals/AnimalTable";

const AnimalManagementView = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");

  const animalData = [
    {
      id: "AN001",
      name: "Luna",
      species: "African Lion",
      emoji: "🦁",
      age: "5 years",
      health: "Excellent",
      habitat: "Savanna Exhibit",
      caretaker: "Mike Rodriguez",
      lastCheckup: "2 days ago",
    },
    {
      id: "AN002",
      name: "Echo",
      species: "African Elephant",
      emoji: "🐘",
      age: "12 years",
      health: "Good",
      habitat: "Elephant Plains",
      caretaker: "Sarah Johnson",
      lastCheckup: "1 week ago",
    },
    {
      id: "AN003",
      name: "Frost",
      species: "Emperor Penguin",
      emoji: "🐧",
      age: "3 years",
      health: "Fair",
      habitat: "Arctic Zone",
      caretaker: "Emily Chen",
      lastCheckup: "3 days ago",
    },
    {
      id: "AN004",
      name: "Grace",
      species: "Reticulated Giraffe",
      emoji: "🦒",
      age: "8 years",
      health: "Excellent",
      habitat: "African Savanna",
      caretaker: "Mike Rodriguez",
      lastCheckup: "1 day ago",
    },
  ];

  const filteredAnimals = animalData.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.habitat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (animal) => {
    console.log("Edit animal:", animal);
    alert(`Editing ${animal.name}`);
  };

  const handleDelete = (animal) => {
    console.log("Delete animal:", animal);
    if (
      confirm(`Are you sure you want to remove ${animal.name} from the system?`)
    ) {
      alert(`${animal.name} removed`);
    }
  };

  const handleView = (animal) => {
    console.log("View animal:", animal);
    alert(`Viewing details for ${animal.name}`);
  };

  const handleAdd = () => {
    console.log("Add new animal");
    alert("Opening new animal registration form...");
  };

  const handleFilter = () => {
    console.log("Apply filters");
    alert("Opening filter options...");
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Animal Management</h1>
          <p className='text-gray-400 mt-1'>
            Monitor and manage all animals in the zoo
          </p>
        </div>

        <div className='flex items-center space-x-3'>
          <ActionButton
            onClick={() =>
              setViewMode(viewMode === "cards" ? "table" : "cards")
            }
            variant='outline'
          >
            {viewMode === "cards" ? "Table View" : "Card View"}
          </ActionButton>
          <ActionButton onClick={() => {}} variant='secondary'>
            <Download className='w-4 h-4 mr-2' />
            Export
          </ActionButton>
        </div>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilter={handleFilter}
        onAdd={handleAdd}
        addButtonText='Add Animal'
      />

      <div className='bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-emerald-400'>
              {animalData.length}
            </div>
            <div className='text-sm text-gray-400'>Total Animals</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>
              {animalData.filter((a) => a.health === "Excellent").length}
            </div>
            <div className='text-sm text-gray-400'>Excellent Health</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-400'>
              {animalData.filter((a) => a.health === "Good").length}
            </div>
            <div className='text-sm text-gray-400'>Good Health</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>
              {animalData.filter((a) => a.health === "Fair").length}
            </div>
            <div className='text-sm text-gray-400'>Needs Attention</div>
          </div>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <AnimalTable
          animals={filteredAnimals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {filteredAnimals.length === 0 && (
        <div className='text-center py-12'>
          <Heart className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-medium text-gray-300'>
            No animals found
          </h3>
          <p className='mt-1 text-sm text-gray-400'>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalManagementView;
