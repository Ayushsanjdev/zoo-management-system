import React from "react";
import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { Calendar, Edit, Eye, Mail, Phone, Trash2 } from "lucide-react";

const StaffCard = ({ staff, onEdit, onDelete, onView }) => (
  <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200'>
    <div className='flex items-start justify-between mb-4'>
      <div className='flex items-center space-x-4'>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
            staff.role === "Manager"
              ? "bg-emerald-500"
              : staff.role === "Veterinarian"
              ? "bg-blue-500"
              : "bg-purple-500"
          }`}
        >
          {staff.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className='text-lg font-semibold text-white'>{staff.name}</h3>
          <p className='text-sm text-gray-400'>{staff.role}</p>
        </div>
      </div>
      <StatusBadge status={staff.status} />
    </div>

    <div className='space-y-2 mb-4'>
      <div className='flex items-center text-sm text-gray-300'>
        <Mail className='w-4 h-4 mr-2 text-gray-400' />
        {staff.email}
      </div>
      <div className='flex items-center text-sm text-gray-300'>
        <Phone className='w-4 h-4 mr-2 text-gray-400' />
        {staff.phone}
      </div>
      <div className='flex items-center text-sm text-gray-300'>
        <Calendar className='w-4 h-4 mr-2 text-gray-400' />
        Joined {staff.joinDate}
      </div>
    </div>

    <div className='flex items-center space-x-2'>
      <ActionButton onClick={() => onView(staff)} variant='outline' size='sm'>
        <Eye className='w-4 h-4 mr-1' />
        View
      </ActionButton>
      <ActionButton onClick={() => onEdit(staff)} variant='secondary' size='sm'>
        <Edit className='w-4 h-4 mr-1' />
        Edit
      </ActionButton>
      <ActionButton onClick={() => onDelete(staff)} variant='danger' size='sm'>
        <Trash2 className='w-4 h-4 mr-1' />
        Delete
      </ActionButton>
    </div>
  </div>
);

export default StaffCard;
