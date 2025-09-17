import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  foodTypeFilter: string;
  onFoodTypeChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function SearchFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  foodTypeFilter,
  onFoodTypeChange,
  onClearFilters,
  hasActiveFilters
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="club">Club</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="career">Career</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={foodTypeFilter} onValueChange={onFoodTypeChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Food Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Food Types</SelectItem>
            <SelectItem value="pizza">Pizza</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="dessert">Dessert</SelectItem>
            <SelectItem value="coffee">Coffee & Drinks</SelectItem>
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Category: {categoryFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          {foodTypeFilter !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Food: {foodTypeFilter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFoodTypeChange('all')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}