"use client";

import { ColumnDef } from "@tanstack/react-table";

import generateSortFilterColumns from "@/app/(main)/projects/components/table/generate-sort-filter-columns";
import { selectColumn } from "../../../../components/table/select-column";
import { policiesTableColumnList } from "../../data/columnList";
import { Policy } from "../../types/policy";

export const policyColumns: ColumnDef<Policy>[] = [
  selectColumn<Policy>(),
  ...generateSortFilterColumns<Policy>(policiesTableColumnList),
];
