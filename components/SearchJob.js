import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const SearchJob = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);

  const jobs = useSelector((state) => Object.values(state.job?.jobs || {}));

  const handleSearchChange = (text) => {
    setSearch(text);
    if (text.trim().length > 0) {
      const matches = jobs
        .map((job) => job.title)
        .filter((title) => title.toLowerCase().includes(text.toLowerCase()));
      setTitleSuggestions([...new Set(matches)]);
    } else {
      setTitleSuggestions([]);
    }
  };

  const handleLocationChange = (text) => {
    setLocation(text);
    if (text.trim().length > 0) {
      const matches = jobs
        .map((job) => job.location)
        .filter((loc) => loc.toLowerCase().includes(text.toLowerCase()));
      setLocationSuggestions([...new Set(matches)]);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleCategoryChange = (text) => {
    setCategory(text);
    if (text.trim().length > 0) {
      const matches = jobs
        .map((job) => job.category || "")
        .filter((cat) => cat.toLowerCase().includes(text.toLowerCase()));
      setCategorySuggestions([...new Set(matches)]);
    } else {
      setCategorySuggestions([]);
    }
  };

  const handleSuggestionPress = (fieldSetter, value, suggestionSetter) => {
    fieldSetter(value);
    suggestionSetter([]);
  };

  const onSearch = () => {
    const matches = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (job.category || "").toLowerCase().includes(category.toLowerCase())
    );

    setFilteredJobs(matches);
    setTitleSuggestions([]);
    setLocationSuggestions([]);
    setCategorySuggestions([]);

    if (matches.length > 0) {
      Alert.alert(`Found ${matches.length} matching job(s)!`);
    } else {
      Alert.alert("No matching jobs found.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Job Search</Text>

      {/* Title Input */}
      <View style={styles.formItem}>
        <Text style={styles.label}>Search Job Now:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Software Developer"
          value={search}
          onChangeText={handleSearchChange}
          placeholderTextColor="#999"
        />
        {titleSuggestions.length > 0 && (
          <View style={styles.suggestionsBox}>
            {titleSuggestions.map((title, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleSuggestionPress(setSearch, title, setTitleSuggestions)
                }
              >
                <Text style={styles.suggestionItem}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Location Input */}
      <View style={styles.formItem}>
        <Text style={styles.label}>Job Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. New York"
          value={location}
          onChangeText={handleLocationChange}
          placeholderTextColor="#999"
        />
        {locationSuggestions.length > 0 && (
          <View style={styles.suggestionsBox}>
            {locationSuggestions.map((loc, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleSuggestionPress(
                    setLocation,
                    loc,
                    setLocationSuggestions
                  )
                }
              >
                <Text style={styles.suggestionItem}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Category Input */}
      <View style={styles.formItem}>
        <Text style={styles.label}>Job Category:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Design, Engineering"
          value={category}
          onChangeText={handleCategoryChange}
          placeholderTextColor="#999"
        />
        {categorySuggestions.length > 0 && (
          <View style={styles.suggestionsBox}>
            {categorySuggestions.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleSuggestionPress(
                    setCategory,
                    cat,
                    setCategorySuggestions
                  )
                }
              >
                <Text style={styles.suggestionItem}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Found Jobs */}
      {filteredJobs.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.resultTitle}>Results:</Text>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#000",
    fontFamily: "OpenSans-Bold",
  },
  formItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    color: "#000",
    fontFamily: "Montserrat-Regular",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: "#000",
    fontFamily: "Montserrat-Regular",
  },
  suggestionsBox: {
    marginTop: 4,
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 120,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    color: "#333",
  },
  button: {
    backgroundColor: "#c6a02d",
    paddingVertical: 14,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default SearchJob;
