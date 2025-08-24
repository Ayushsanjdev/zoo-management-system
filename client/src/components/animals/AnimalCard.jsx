import React from "react";
import StatusBadge from "../common/StatusBadge";
import { Activity, Calendar, Edit, Eye, MapPin, Trash2, User } from "lucide-react";
import ActionButton from "../common/ActionButton";

const AnimalCard = ({ animal, onEdit, onDelete, onView }) => (
  <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200'>
    <div className='flex items-start justify-between mb-4'>
      <div className='flex items-center space-x-4'>
        <div className='text-4xl'>{animal.emoji}</div>
        <div>
          <h3 className='text-lg font-semibold text-white'>{animal.name}</h3>
          <p className='text-sm text-gray-400'>{animal.species}</p>
        </div>
      </div>
      <StatusBadge status={animal.health} type='health' />
    </div>

    <div className='space-y-2 mb-4'>
      <div className='flex items-center text-sm text-gray-300'>
        <Calendar className='w-4 h-4 mr-2 text-gray-400' />
        Age: {animal.age}
      </div>
      <div className='flex items-center text-sm text-gray-300'>
        <MapPin className='w-4 h-4 mr-2 text-gray-400' />
        {animal.habitat}
      </div>
      <div className='flex items-center text-sm text-gray-300'>
        <User className='w-4 h-4 mr-2 text-gray-400' />
        Caretaker: {animal.caretaker}
      </div>
      <div className='flex items-center text-sm text-gray-300'>
        <Activity className='w-4 h-4 mr-2 text-gray-400' />
        Last checkup: {animal.lastCheckup}
      </div>
    </div>

    <div className='flex items-center space-x-2'>
      <ActionButton onClick={() => onView(animal)} variant='outline' size='sm'>
        <Eye className='w-4 h-4 mr-1' />
        View
      </ActionButton>
      <ActionButton
        onClick={() => onEdit(animal)}
        variant='secondary'
        size='sm'
      >
        <Edit className='w-4 h-4 mr-1' />
        Edit
      </ActionButton>
      <ActionButton onClick={() => onDelete(animal)} variant='danger' size='sm'>
        <Trash2 className='w-4 h-4 mr-1' />
        Delete
      </ActionButton>
    </div>
  </div>
);
export default AnimalCard;
