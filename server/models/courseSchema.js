var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
    min: 0,
    max: 12,
  },
  semester: {
    type: Number,
    required: true,
  },
  session: {
    type: Number,
    required: true,
  },
  CoPoMap: {
    CO1: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
    CO2: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
    CO3: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
    CO4: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
    CO5: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
    CO6: {
      PO1: {
        type: Number,
        default: 0,
      },
      PO2: {
        type: Number,
        default: 0,
      },
      PO3: {
        type: Number,
        default: 0,
      },
      PO4: {
        type: Number,
        default: 0,
      },
      PO5: {
        type: Number,
        default: 0,
      },
      PO6: {
        type: Number,
        default: 0,
      },
      PO7: {
        type: Number,
        default: 0,
      },
      PO8: {
        type: Number,
        default: 0,
      },
      PO9: {
        type: Number,
        default: 0,
      },
      PO10: {
        type: Number,
        default: 0,
      },
      PO11: {
        type: Number,
        default: 0,
      },
      PO12: {
        type: Number,
        default: 0,
      },
      PSO1: {
        type: Number,
        default: 0,
      },
      PSO2: {
        type: Number,
        default: 0,
      },
      PSO3: {
        type: Number,
        default: 0,
      },
    },
  },
  teachingFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  belongingProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  belongingDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

var Course = mongoose.model("Course", courseSchema);

module.exports = Course;
