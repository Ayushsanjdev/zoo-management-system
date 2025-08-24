import React from "react";
import StatusBadge from "../common/StatusBadge";
import ActionButton from "../common/ActionButton";
import { Edit, Eye, Trash2 } from "lucide-react";

const AnimalTable = ({ animals, onEdit, onDelete, onView }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Animal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Species & Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Health Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Habitat
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Caretaker
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {animals.map((animal) => (
            <tr key={animal.id} className="hover:bg-gray-700/30 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{animal.emoji}</div>
                  <div>
                    <div className="text-sm font-medium text-white">{animal.name}</div>
                    <div className="text-sm text-gray-400">ID: {animal.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{animal.species}</div>
                <div className="text-sm text-gray-400">{animal.age}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={animal.health} type="health" />
                <div className="text-xs text-gray-400 mt-1">
                  Last: {animal.lastCheckup}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {animal.habitat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {animal.caretaker}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <ActionButton onClick={() => onView(animal)} variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </ActionButton>
                <ActionButton onClick={() => onEdit(animal)} variant="secondary" size="sm">
                  <Edit className="w-4 h-4" />
                </ActionButton>
                <ActionButton onClick={() => onDelete(animal)} variant="danger" size="sm">
                  <Trash2 className="w-4 h-4" />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AnimalTable;
