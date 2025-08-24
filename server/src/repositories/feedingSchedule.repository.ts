import { FeedingSchedule } from "../generated/prisma/client";
import { FilterParams } from "../utils/pagination";
import { BaseRepository } from "./base.repository";

export class FeedingScheduleRepository extends BaseRepository<FeedingSchedule> {
  constructor() {
    super("feedingSchedule");
  }

  protected buildWhereClause(filters: FilterParams): any {
    const where: any = {};

    if (filters.staffId) {
      where.assignedStaffId = filters.staffId;
    }

    if (filters.animalId) {
      where.animalId = filters.animalId;
    }

    if (filters.foodType) {
      where.foodType = { contains: filters.foodType, mode: "insensitive" };
    }

    if (
      filters.quantityMin !== undefined ||
      filters.quantityMax !== undefined
    ) {
      where.quantity = {};
      if (filters.quantityMin !== undefined)
        where.quantity.gte = filters.quantityMin;
      if (filters.quantityMax !== undefined)
        where.quantity.lte = filters.quantityMax;
    }

    if (filters.search) {
      where.OR = [
        { foodType: { contains: filters.search, mode: "insensitive" } },
        { staff: { name: { contains: filters.search, mode: "insensitive" } } },
        { animal: { name: { contains: filters.search, mode: "insensitive" } } },
        {
          animal: {
            species: { contains: filters.search, mode: "insensitive" },
          },
        },
      ];
    }

    return where;
  }

  async getFoodTypeList(): Promise<string[]> {
    const foodTypes = await this.prisma.feedingSchedule.findMany({
      select: { foodType: true },
      distinct: ["foodType"],
      orderBy: { foodType: "asc" },
    });
    return foodTypes.map((f) => f.foodType);
  }

  async getStaffList(): Promise<
    Array<{ id: string; name: string; email: string }>
  > {
    const staff = await this.prisma.user.findMany({
      where: { role: "STAFF" },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    });
    return staff;
  }

  async getAnimalList(): Promise<
    Array<{ id: string; name: string; species: string }>
  > {
    const animals = await this.prisma.animal.findMany({
      select: { id: true, name: true, species: true },
      orderBy: { name: "asc" },
    });
    return animals;
  }

  // Override methods to include related data
  async findAll(
    filters: FilterParams = {},
    pagination: any = {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  ) {
    return super.findAll(filters, pagination, {
      assignedStaff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }

  async findById(id: string) {
    return super.findById(id, {
      assignedStaff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }

  async update(id: string, data: any) {
    return super.update(id, data, {
      assignedStaff: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      animal: {
        select: {
          id: true,
          name: true,
          species: true,
          healthStatus: true,
        },
      },
    });
  }
}
