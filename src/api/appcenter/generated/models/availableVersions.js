/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a AvailableVersions.
 */
class AvailableVersions {
  /**
   * Create a AvailableVersions.
   * @member {array} [versions] List of available versions.
   * @member {number} [totalCount] The full number of versions across all
   * pages.
   */
  constructor() {
  }

  /**
   * Defines the metadata of AvailableVersions
   *
   * @returns {object} metadata of AvailableVersions
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'AvailableVersions',
      type: {
        name: 'Composite',
        className: 'AvailableVersions',
        modelProperties: {
          versions: {
            required: false,
            serializedName: 'versions',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'StringElementType',
                  type: {
                    name: 'String'
                  }
              }
            }
          },
          totalCount: {
            required: false,
            serializedName: 'total_count',
            type: {
              name: 'Number'
            }
          }
        }
      }
    };
  }
}

module.exports = AvailableVersions;
