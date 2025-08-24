import React, { useState } from "react";
import { Download, Users } from "lucide-react";
import ActionButton from "../components/common/ActionButton";
import SearchAndFilter from "../components/common/SearchAndFilter";
import StaffCard from "../components/staff/StaffCard";
import StaffTable from "../components/staff/StaffTable";

const StaffManagementView = () => {
  const [viewMode, setViewMode] = useState("cards"); // cards or table
  const [searchTerm, setSearchTerm] = useState("");

  const staffData = [
    {
      id: "ST001",
      name: "Dr. Sarah Johnson",
      role: "Veterinarian",
      department: "Medical",
      status: "Active",
      email: "sarah.johnson@zoo.com",
      phone: "(555) 123-4567",
      joinDate: "Jan 2020",
    },
    {
      id: "ST002",
      name: "Mike Rodriguez",
      role: "Zookeeper",
      department: "Animal Care",
      status: "Active",
      email: "mike.rodriguez@zoo.com",
      phone: "(555) 234-5678",
      joinDate: "Mar 2021",
    },
    {
      id: "ST003",
      name: "Emily Chen",
      role: "Manager",
      department: "Operations",
      status: "Busy",
      email: "emily.chen@zoo.com",
      phone: "(555) 345-6789",
      joinDate: "May 2019",
    },
    {
      id: "ST004",
      name: "James Wilson",
      role: "Maintenance",
      department: "Facilities",
      status: "Available",
      email: "james.wilson@zoo.com",
      phone: "(555) 456-7890",
      joinDate: "Sep 2022",
    },
  ];

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (staff) => {
    console.log("Edit staff:", staff);
    alert(`Editing ${staff.name}`);
  };

  const handleDelete = (staff) => {
    console.log("Delete staff:", staff);
    if (confirm(`Are you sure you want to delete ${staff.name}?`)) {
      alert(`${staff.name} deleted`);
    }
  };

  const handleView = (staff) => {
    console.log("View staff:", staff);
    alert(`Viewing details for ${staff.name}`);
  };

  const handleAdd = () => {
    console.log("Add new staff");
    alert("Opening new staff form...");
  };

  const handleFilter = () => {
    console.log("Apply filters");
    alert("Opening filter options...");
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Staff Management</h1>
          <p className='text-gray-400 mt-1'>
            Manage zoo staff members and their roles
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
        addButtonText='Add Staff'
      />

      <div className='bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-emerald-400'>
              {staffData.length}
            </div>
            <div className='text-sm text-gray-400'>Total Staff</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>
              {staffData.filter((s) => s.status === "Active").length}
            </div>
            <div className='text-sm text-gray-400'>Active</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>
              {staffData.filter((s) => s.status === "Busy").length}
            </div>
            <div className='text-sm text-gray-400'>Busy</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-400'>
              {staffData.filter((s) => s.status === "Available").length}
            </div>
            <div className='text-sm text-gray-400'>Available</div>
          </div>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredStaff.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <StaffTable
          staff={filteredStaff}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {filteredStaff.length === 0 && (
        <div className='text-center py-12'>
          <Users className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-medium text-gray-300'>
            No staff found
          </h3>
          <p className='mt-1 text-sm text-gray-400'>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffManagementView;
